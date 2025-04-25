package com.ka

import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableArray
import com.facebook.react.module.annotations.ReactModule
import com.ka.Attestation.AttestationHelper
import java.security.PublicKey
import java.util.Base64

@ReactModule(name = KaModule.NAME)
class KaModule(reactContext: ReactApplicationContext) :
  NativeKaSpec(reactContext) {


  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  @RequiresApi(Build.VERSION_CODES.O)
  override fun generateKeys(challengeString: String): String? {
    val publicKey: PublicKey? = try {
      AttestationHelper.generateAttestationKey(challengeString)
  } catch (e: Exception) {
      e.printStackTrace()
      return null;
  }
    return publicKey?.let {
      Base64.getEncoder().encodeToString(it.encoded)
    }
  }

  override fun getAttestationCertificates(): WritableArray {
    val attestationCertificates = AttestationHelper.getAttestationCertificates()
    val writableArray = Arguments.createArray()

    for (certificate in attestationCertificates) {
      writableArray.pushString(certificate)
    }

    return writableArray
  }

   // Dummy implementation for generateIOSKeys
   override fun generateIOSKeys(promise: com.facebook.react.bridge.Promise) {
    promise.reject("INVALID_PLATFORM", "Android should not generate iOS keys")
}

override fun getIOSAttest(challenge: String, promise: com.facebook.react.bridge.Promise) {
  promise.reject("INVALID_PLATFORM", "Android should not handle iOS attestation")
}

companion object {
  const val NAME = "Ka"
}

 }