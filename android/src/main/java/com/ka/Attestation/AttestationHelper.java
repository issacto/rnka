package com.ka.Attestation;

import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.PublicKey;
import java.security.cert.Certificate;
import java.util.ArrayList;
import java.util.List;
public class AttestationHelper {

    private static final String KEY_ALIAS = "attestation_rsa_key";

    // Generate hardware-backed key with attestation challenge
    public static PublicKey generateAttestationKey(String challengeString) throws Exception {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            byte[] challenge = Base64.decode(challengeString, Base64.DEFAULT);

            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(
                    KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                KeyGenParameterSpec.Builder builder = new KeyGenParameterSpec.Builder(
                        KEY_ALIAS,
                        KeyProperties.PURPOSE_SIGN | KeyProperties.PURPOSE_VERIFY)
                        .setKeySize(2048)
                        .setDigests(KeyProperties.DIGEST_SHA256, KeyProperties.DIGEST_SHA512)
                        .setSignaturePaddings(KeyProperties.SIGNATURE_PADDING_RSA_PKCS1)
                        .setAttestationChallenge(challenge)
                        .setUserAuthenticationRequired(false)
                        .setIsStrongBoxBacked(true); // Optional: enable if supported and needed

                keyPairGenerator.initialize(builder.build());
                KeyPair keyPair = keyPairGenerator.generateKeyPair();
                return keyPair.getPublic();
            }
        }

        return null;
    }

    // Get attestation certificate chain as Base64-encoded strings
    public static List<String> getAndroidAttest() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        Certificate[] certChain = keyStore.getCertificateChain(KEY_ALIAS);
        if (certChain == null) {
            throw new IllegalStateException("Key not found or no attestation available.");
        }
        List<String> base64Certs = new ArrayList<>();
        for (Certificate cert : certChain) {
            base64Certs.add(Base64.encodeToString(cert.getEncoded(), Base64.NO_WRAP));
        }

        return base64Certs;
    }
}
