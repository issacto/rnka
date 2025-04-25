#import "Ka.h"
#import "Ka-Swift.h" // Generated Swift bridge header
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@implementation Ka

RCT_EXPORT_MODULE()

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);

    return result;
}

RCT_EXPORT_METHOD(generateIOSKeys:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
     NSLog(@"[DEBUG] Ka: generateIOSKeys method was called");

    [AttestationHelper generateSecureEnclavePublicKeyAsync:^(NSString * _Nullable key) {
        if (key) {
            NSLog(@"[DEBUG] Key received from Swift: %@", key);
            resolve(key);
        } else {
            NSLog(@"[DEBUG] No key generated.");
            reject(@"key_generation_failed", @"Failed to generate key", nil);
        }
    }];
}

RCT_EXPORT_METHOD(getIOSAttest:(NSString *)inputString
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    NSLog(@"[DEBUG] Ka: getIOSAttest method was called with input: %@", inputString);
    AttestationHelper *helper = [[AttestationHelper alloc] init];
    [helper attestWithSessionID:@"abc" completion:^(NSString *key) {
        if (key) {
            NSLog(@"[DEBUG] Key received from Swift: %@", key);
            resolve(key);
        } else {
            NSLog(@"[DEBUG] No attestation generated.");
            reject(@"key_attestation_failed", @"Failed to generate attest", nil);
        }
    }];
}

// RCT_EXPORT_METHOD(generateIOSKeys:(RCTResponseSenderBlock)callback) {
//   NSLog(@"Calling Swift Key Generator...");
//     // Return a dummy success message immediately
//   callback(@[@"DUMMY_SUCCESS_KEY_123"]);
// }
//   @try {
//     NSLog(@"[DEBUG] Ka: About to call Swift Key Generator");
//     [AttestationHelper generateSecureEnclavePublicKeyAsync:^(NSString * _Nullable publicKeyBase64) {
//       NSLog(@"[DEBUG] Ka: Swift callback received with result: %@", publicKeyBase64 ?: @"nil");
//       NSString *result = publicKeyBase64 ?: @"Failed to get public key";
//       callback(@[result]);
//     }];
//     NSLog(@"[DEBUG] Ka: After calling Swift Key Generator");
//   } @catch (NSException *exception) {
//     NSLog(@"[ERROR] Ka: Exception in generateIOSKeys: %@", exception);
//     callback(@[@"Error", exception.description]);
//   }
// }

// If you’re using TurboModules
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeKaSpecJSI>(params);
}

@end
