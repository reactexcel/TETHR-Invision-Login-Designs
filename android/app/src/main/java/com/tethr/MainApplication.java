package com.tethr;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import android.content.Intent; // <--- Import Intent
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.appevents.AppEventsLogger;     // <--- import

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.facebook.react.ReactActivity;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;



public class MainApplication extends Application implements ReactApplication {
  private ReactNativePushNotificationPackage mReactNativePushNotificationPackage; // <------ Add Package Variable
  private static CallbackManager mCallbackManager;

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(this);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      mCallbackManager = new CallbackManager.Factory().create();
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(); // <------ Initialize the Package
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              mReactNativePushNotificationPackage,
              new RNDeviceInfo(),
              new VectorIconsPackage(),
              new RNGoogleSigninPackage(),
              new FBSDKPackage(mCallbackManager)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }
  // Add onNewIntent
  public void onNewIntent(Intent intent) {
    if ( mReactNativePushNotificationPackage != null ) {
      mReactNativePushNotificationPackage.newIntent(intent);
    }
  }
  public static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
}