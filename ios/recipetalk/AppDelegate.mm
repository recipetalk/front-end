#import "AppDelegate.h"
#import <Firebase.h>
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  UNUserNotificationCenter.currentNotificationCenter.delegate = self;
  
  [FIRApp configure];
  self.moduleName = @"recipetalk";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  
  //시작하면 뱃지 0으로 시작
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

 - (void)applicationWillTerminate:(UIApplication *)application
{
  UNUserNotificationCenter.currentNotificationCenter.removeAllPendingNotificationRequests;
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL]; //[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

// iOS10 이상 푸시 Delegate
#pragma mark - UNUserNotificationCenter Delegate for >= iOS 10
// 앱이 실행되고 있을때 푸시 데이터 처리
- (void) userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    NSLog(@"Remote notification : %@",notification.request.content.userInfo);
    //푸시 배너를 띄워준다
  completionHandler(UNNotificationPresentationOptionBanner | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound);
}

@end
