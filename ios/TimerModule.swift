//
//  TimerModule.swift
//  recipetalk
//
//  Created by KimHyunJin on 2023/05/03.
//

import Foundation
import ActivityKit
import UserNotifications

@objc(TimerModule)
class TimerModule: NSObject {
  
  let userNotificationCenter = UNUserNotificationCenter.current()
  
  @objc(startTimerActivity:)
  func startTimerActivity(endTime: NSNumber) {
    if #available(iOS 16.1, *) {
      
      let initialContentStatus = TimerAttributes.ContentState(endTime: Date().addingTimeInterval(endTime.doubleValue), startTime: .now)
      let activityAttributes = TimerAttributes(name: "TEST")
      
      do {
        _ = try Activity.request(attributes: activityAttributes, contentState: initialContentStatus, pushType: nil)
        print("Requested a timer live activity")
      } catch ( let error ) {
        print("Error reqeusting a timer live activity \(error.localizedDescription)")
      }
    }
  }
  
  @objc(updateTimerActivity:)
  func updateTimerActivity(endTime: NSNumber) {
    if #available(iOS 16.1, *) {
      let timerStatus = TimerAttributes.ContentState(endTime: Date().addingTimeInterval(endTime.doubleValue), startTime: .now)
      Task {
        for activity in Activity<TimerAttributes>.activities {
          await activity.update(using: timerStatus)
        }
      }
    }
  }

  @objc(endTimerActivity)
  func endTimerActivity() {
    if #available(iOS 16.1, *) {
      let timerStatus = TimerAttributes.ContentState(endTime: .now, startTime: .now)
      
      Task {
        for activity in Activity<TimerAttributes>.activities {
          await activity.end(using: timerStatus, dismissalPolicy: .immediate)
        }
      }
    }
  }


  
  @objc(registerReservedNotification:)
  func registerReservedNotification(time: NSNumber) {
    
    let content = UNMutableNotificationContent()
    content.title = "레시피톡"
    content.body = "타이머가 다됬어요!"
  
    if #available(iOS 15.2, *){
      content.sound = UNNotificationSound.defaultRingtone
    }
    
    let updateDate = Date().addingTimeInterval(time.doubleValue);
    let dateComponents = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute, .second], from: updateDate)
    let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: false)
    let request = UNNotificationRequest(identifier: "Timer_End", content: content, trigger: trigger)
    
    userNotificationCenter.add(request) { error in
      if let error = error {
        print(error)
      }
    }
  }
  
  @objc(removeReservedNotification)
  func removeReservedNotification() {
    userNotificationCenter.removePendingNotificationRequests(withIdentifiers: ["Timer_End"])
  }
  
}

