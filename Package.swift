// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorSharedStore",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorSharedStore",
            targets: ["SharedStorePlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "SharedStorePlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/SharedStorePlugin"),
        .testTarget(
            name: "SharedStorePluginTests",
            dependencies: ["SharedStorePlugin"],
            path: "ios/Tests/SharedStorePluginTests")
    ]
)