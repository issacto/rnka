import Foundation
import DeviceCheck
import CryptoKit


@objc public class AttestationHelper: NSObject {
    private let attestService = DCAppAttestService.shared
    @objc public private(set) var keyID: NSString?

    @objc public override init() {
        super.init()
        guard attestService.isSupported else {
            print("[!] Attest service not available. AttestationHelper cannot be fully initialized.")
            return
        }

        self.retrieveExistingKeyID()
    }

    @objc public static let keyName = "com.myapp.attestation.keyID"
    

    /// New version of `generateSecureEnclavePublicKeySync` that uses a completion block instead of blocking.
  @objc public static func generateSecureEnclavePublicKeyAsync(_ completion: @escaping (String?) -> Void) {
        let userDefaults = UserDefaults.standard

        guard DCAppAttestService.shared.isSupported else {
            completion(nil)
            return
        }

        // If already exists, return it
        if let existingKeyID = userDefaults.string(forKey: keyName) {
            completion(existingKeyID as String)
            return
        }

        // Otherwise generate new one
        DCAppAttestService.shared.generateKey { keyID, error in
            guard error == nil, let keyID = keyID else {
                print("[!] Error or nil keyID: \(String(describing: error))")
                completion(nil)
                return
            }
            userDefaults.set(keyID, forKey: keyName)
            completion(keyID as String)
        }
    }

    @objc public func retrieveExistingKeyID() {
        let userDefaults = UserDefaults.standard
        if let existingKeyID = userDefaults.string(forKey: Self.keyName) as? NSString {
            self.keyID = existingKeyID
            print("✅ Retrieved existing Key ID: \(existingKeyID)")
        } else {
            print("ℹ️ No existing Key ID found.")
        }
    }

    @objc public func getIOSAttest(sessionID: String, completion: @escaping (NSString?) -> Void) {
        guard let currentKeyID = self.keyID else {
            print("[!] Key ID is not available. Ensure a key has been generated or retrieved.")
            completion(nil)
            return
        }


        print("Calling Apple servers with keyID: \(currentKeyID)" as NSString)
        
//        let randomSessionID = NSUUID().uuidString
        let challenge = sessionID.data(using: .utf8)!
        let hash = Data(SHA256.hash(data: challenge))

        attestService.attestKey(currentKeyID as String, clientDataHash: hash) { attestation, error in
            guard error == nil else {
                print("[!] Attestation error: \(String(describing: error))")
                completion(nil)
                return
            }

            guard let attestationObject = attestation else {
                print("[!] Received nil attestation object")
                completion(nil)
                return
            }
            
            print("attestationObject")
            print(attestationObject)
            
             let base64Attestation = attestationObject.base64EncodedString()
            print("📦 Base64 Attestation Object:")
            print(base64Attestation)
            completion(base64Attestation as NSString)
        }
    }
    
}

