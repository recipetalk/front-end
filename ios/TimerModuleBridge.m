//
//  TimerModuleBridge.m
//  recipetalk
//
//  Created by KimHyunJin on 2023/05/03.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TimerModule, NSObject)

//Live Activity Timer Controller
RCT_EXTERN_METHOD(startTimerActivity: (nonnull NSNumber *)endTime)
RCT_EXTERN_METHOD(updateTimerActivity: (nonnull NSNumber *)endTime)
RCT_EXTERN_METHOD(endTimerActivity)


//Timer End Notification Controller
RCT_EXTERN_METHOD(registerReservedNotification: (nonnull NSNumber *)time)
RCT_EXTERN_METHOD(removeReservedNotification)

@end

