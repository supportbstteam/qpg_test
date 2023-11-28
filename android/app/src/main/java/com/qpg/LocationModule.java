package com.qpg;

import android.annotation.SuppressLint;
import android.content.Context;
import com.qpg.LocationTrackingService;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationListener;
import android.os.Bundle;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class LocationModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    // private LocationListener locationListener = new LocationListener() {
    //     @Override
    //     public void onLocationChanged(@NonNull Location location) {
    //         // This method will be called whenever the location changes
    //         // Handle the updated location here

    //     }

    //     @Override
    //     public void onStatusChanged(String provider, int status, Bundle extras) {
    //     }

    //     @Override
    //     public void onProviderEnabled(String provider) {
    //     }

    //     @Override
    //     public void onProviderDisabled(String provider) {
    //     }
    // };

    LocationModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "LocationModule";
    }

    @ReactMethod
    public void getPhoneID(Promise response) {
        try {
            @SuppressLint("HardwareIds")
            String id = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
            response.resolve(id);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    // @ReactMethod
    // public void startLocationTracking() {
    //     Intent serviceIntent = new Intent(getReactApplicationContext(), LocationTrackingService.class);
    //     getReactApplicationContext().startService(serviceIntent);
    // }

    // @ReactMethod
    // public void stopLocationTracking() {
    //     Intent serviceIntent = new Intent(getReactApplicationContext(), LocationTrackingService.class);
    //     getReactApplicationContext().stopService(serviceIntent);
    // }
}