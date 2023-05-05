//
//  TimerAttributes.swift
//  recipetalk
//
//  Created by KimHyunJin on 2023/05/03.
//

import Foundation
import ActivityKit

struct TimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
      var endTime: Date
      var startTime: Date
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}
