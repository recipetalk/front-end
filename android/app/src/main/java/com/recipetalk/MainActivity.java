package com.recipetalk;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
import com.recipetalk.timer.TimerModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "recipetalk";
  }
  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }

  //앱 껐을 때 알림 제거
  @Override
  protected void onDestroy() {

    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getReactInstanceManager().getCurrentReactContext());
//        Intent reactIntent = new Intent(getReactApplicationContext(), MainActivity.class);
//        PendingIntent reactPandingIntent = PendingIntent.getActivity(getReactApplicationContext(), 0, reactIntent, PendingIntent.FLAG_IMMUTABLE);

    int time_notification_id = 1;
    notificationManager.cancel(time_notification_id);
    Log.d("MainActivity : ", " 앱 소멸");
    super.onDestroy();
  }

}
