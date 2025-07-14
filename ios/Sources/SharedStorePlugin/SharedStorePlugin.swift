import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(SharedStorePlugin)
public class SharedStorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SharedStorePlugin"
    public let jsName = "SharedStore"

    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getItem", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setItem", returnType: CAPPluginReturnPromise)
    ]

    var mySharedDefaults: UserDefaults?
    var appGroupName: String = ""

    @objc func getItem(_ call: CAPPluginCall) {
        guard let key = call.getString("key"), let appGroup = call.getString("appGroup") else {
            call.reject("Missing key or appGroup")
            return
        }
        if appGroup != appGroupName {
            mySharedDefaults = UserDefaults(suiteName: appGroup)
        }
        if mySharedDefaults == nil {
            call.reject("No user defaults with that suite name available", "0")
            return
        }
        if mySharedDefaults?.value(forKey: key) == nil {
            call.reject("Suite has no value for that key", "1")
            return
        }
        call.resolve(["value": mySharedDefaults?.value(forKey: key) ?? NSNull()])
    }

    @objc func setItem(_ call: CAPPluginCall) {
        guard let key = call.getString("key"), let value = call.getString("value"), let appGroup = call.getString("appGroup") else {
            call.reject("Missing key, value, or appGroup")
            return
        }
        if appGroup != appGroupName {
            appGroupName = appGroup
            mySharedDefaults = UserDefaults(suiteName: appGroup)
        }
        if mySharedDefaults == nil {
            call.reject("No user defaults with that suite name available", "0")
            return
        }
        mySharedDefaults?.setValue(value, forKey: key)
        call.resolve()
    }
}
