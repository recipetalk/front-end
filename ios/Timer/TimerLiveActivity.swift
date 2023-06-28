//
//  TimerLiveActivity.swift
//  Timer
//
//  Created by KimHyunJin on 2023/05/03.
//

import ActivityKit
import WidgetKit
import SwiftUI


struct LiveActivityView: View {
  let context: ActivityViewContext<TimerAttributes>
  
  var body: some View {
    HStack {
      Text("레시피톡 타이머").font(.headline).foregroundColor(Color.init(red: 240/255, green: 147/255, blue: 17/255)).padding()
      
      Text(context.state.endTime, style: .timer)
        .font(.custom("Pretendard Variable", fixedSize:40))
        .multilineTextAlignment(.trailing)
        .foregroundColor(Color.init(red: 240/255, green: 147/255, blue: 17/255)).frame(maxWidth: .infinity, alignment: .trailing)
        .padding()
    }
    .activityBackgroundTint(Color.black)
    .activitySystemActionForegroundColor(Color.white)
  }
}

@main
struct TimerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TimerAttributes.self) { context in
            // Lock screen/banner UI goes here
          LiveActivityView(context: context)
        } dynamicIsland: { context in
            DynamicIsland {
                
                DynamicIslandExpandedRegion(.center) {
                  HStack {
                    Text("레시피톡 타이머").font(.headline).foregroundColor(Color.init(red: 240/255, green: 147/255, blue: 17/255))
                    Text(context.state.endTime, style: .timer).font(.custom("Pretendard Variable", fixedSize:40))        .multilineTextAlignment(.trailing)
                        .foregroundColor(Color.init(red: 240/255, green: 147/255, blue: 17/255)).frame(maxWidth: .infinity, alignment: .trailing)
                        .padding()
                  }
                }
            } compactLeading: {
                VStack {
                    Text("레시피톡")
                }
                .activityBackgroundTint(Color.cyan)
                .activitySystemActionForegroundColor(Color.black)
            } compactTrailing: {
                VStack {
                  Text(context.state.endTime, style: .timer).font(.custom("Pretendard Variable", fixedSize: 20))        .multilineTextAlignment(.trailing)
                      .foregroundColor(Color.init(red: 240/255, green: 147/255, blue: 17/255)).frame(maxWidth: .infinity, alignment: .trailing)
                      .padding()
                }

            } minimal: {
                VStack {
                    Text("타이머")
                }
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}
