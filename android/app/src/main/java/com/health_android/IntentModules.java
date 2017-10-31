package com.health_android;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.JSApplicationCausedNativeException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by bengi on 2017/10/24.
 */

public class IntentModules extends ReactContextBaseJavaModule {
    public IntentModules(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IntentModules";
    }

    @ReactMethod
    public void startActivityFromJS(String name, String params){
        try {
            Activity currentActivity = getCurrentActivity();
            if(currentActivity != null){
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }

        }catch(Exception e) {
            throw new JSApplicationCausedNativeException(
                    "不能打开Activity : "+e.getMessage());
        }
    }
}
