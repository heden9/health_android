package com.health_android;

import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by bengi on 2017/10/24.
 */

public class ToastCustomModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT="SHORT";
    private static final String DURATION_LONG="LONG";
    private static int steps;
    public ToastCustomModule(ReactApplicationContext reactContext) {
        super(reactContext);
        MainActivity.mainreactContext = reactContext;
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG, Toast.LENGTH_LONG);
        return constants;
    }
    @Override
    public String getName() {
        return "ToastExample";
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
    public static void setSteps(int steps){
        ToastCustomModule.steps = steps;
    }
    /**
     * 使用回调函数，传值
     * @param successCallback
     * @param errorCallback
     */
    @ReactMethod
    public void measureLayout(Callback successCallback,Callback errorCallback){
        try {
            successCallback.invoke(100, 100, 200, 200);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    /**
     * promise 方式传值
     * @param a1 number
     * @param promise
     */
    @ReactMethod
    public void sendStepsMsg(int a1, Promise promise){
        try{
            promise.resolve(steps);
        } catch (IllegalViewOperationException e){
            promise.reject(e);
        }
    }

}
