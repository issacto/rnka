#import "Ka.h"
#import "Ka-Swift.h" // Generated Swift bridge header
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@implementation Ka

RCT_EXPORT_MODULE()

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
    [helper getIOSAttestWithSessionID:inputString completion:^(NSString *key) {
        if (key) {
            NSLog(@"[DEBUG] Key received from Swift: %@", key);
            resolve(key);
        } else {
            NSLog(@"[DEBUG] No attestation generated.");
            reject(@"key_attestation_failed", @"Failed to generate attest", nil);
        }
    }];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeKaSpecJSI>(params);
}

@end
