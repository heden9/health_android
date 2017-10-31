package com.health_android;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by bengi on 2017/10/24.
 */

public class ToastCustomModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT="SHORT";
    private static final String DURATION_LONG="LONG";
    public ToastCustomModule(ReactApplicationContext reactContext) {
        super(reactContext);
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
    public void measureLayoutPromise(int a1, Promise promise){
        try{
            promise.resolve(a1*2);
        } catch (IllegalViewOperationException e){
            promise.reject(e);
        }
    }
}
