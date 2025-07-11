package com.thienna.capacitor.sharedstore;

import android.content.ContentValues;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SharedStore")
public class SharedStorePlugin extends Plugin {
    private final String TAG = "SharedStorePlugin";

    /**
     * Kiểm tra app đã cài đặt trên Android
     */
    @PluginMethod
    public void isAppInstalledAndroid(PluginCall call) {
        String packageName = call.getString("packageName");
        JSObject ret = new JSObject();
        try {
            PackageManager pm = getContext().getPackageManager();
            pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES);
            ret.put("installed", true);
        } catch (Exception e) {
            ret.put("installed", false);
        }
        call.resolve(ret);
    }

    /**
     * Lưu giá trị key-value vào ContentProvider
     */
    @PluginMethod
    public void setItem(PluginCall call) {
        String key = call.getString("key");
        String value = call.getString("value");
        String appGroup = call.getString("appGroup");
        try {
            String URL = "content://" + appGroup + ".SharedProvider/data";
            Uri CONTENT_URI = Uri.parse(URL);

            ContentValues values = new ContentValues();
            values.put(SharedDatabase.COL_KEY, key);
            values.put(SharedDatabase.COL_VALUE, value);
            String selectionClause = SharedDatabase.COL_KEY + " LIKE ?";
            String[] selectionArgs = { key };
            Cursor c = getContext().getContentResolver().query(CONTENT_URI, null, selectionClause, selectionArgs, null);
            if (c != null && c.moveToFirst()) {
                getContext().getContentResolver().update(CONTENT_URI, values, selectionClause, selectionArgs);
            } else {
                getContext().getContentResolver().insert(CONTENT_URI, values);
            }
            if (c != null) c.close();
            call.resolve();
        } catch (Exception e) {
            Log.e(TAG, e.toString());
            call.reject("setItem failed: " + e.getMessage());
        }
    }

    /**
     * Lấy giá trị theo key từ ContentProvider
     */
    @PluginMethod
    public void getItem(PluginCall call) {
        String key = call.getString("key");
        String appGroup = call.getString("appGroup");
        try {
            String URL = "content://" + appGroup + ".SharedProvider/data";
            Uri CONTENT_URI = Uri.parse(URL);
            String selectionClause = SharedDatabase.COL_KEY + " LIKE ?";
            String[] selectionArgs = { key };
            Cursor c = getContext().getContentResolver().query(CONTENT_URI, null, selectionClause, selectionArgs, null);
            String jsonString = "";
            if (c != null) {
                int index = c.getColumnIndex(SharedDatabase.COL_VALUE);
                while (c.moveToNext()) {
                    jsonString = jsonString + c.getString(index);
                }
                c.close();
            }
            JSObject ret = new JSObject();
            ret.put("value", jsonString);
            call.resolve(ret);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());
            call.reject("getItem failed: " + e.getMessage());
        }
    }
} 