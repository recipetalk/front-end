package com.recipetalk.timer;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.CountDownTimer;
import android.os.SystemClock;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.recipetalk.MainActivity;
import com.recipetalk.R;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

public class TimerModule extends ReactContextBaseJavaModule {
    private final static String TIMER_CLASS = "Timer";
    public static final String CHANNEL_ID = "my_channel_id";
    public static final String CHANNEL_NAME = "My Channel Name";
    private  final ReactApplicationContext reactContext;

    public TimerModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        Log.d(TIMER_CLASS, "초기화");
        reactContext.registerReceiver(AlarmReceiver.alarmReceiver, new IntentFilter());

    }

    @NonNull
    @Override
    public String getName() {
        return TIMER_CLASS;
    }

    @ReactMethod
    public void showNotification(String endTime) {
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getReactApplicationContext());
        Intent reactIntent = new Intent(getReactApplicationContext(), MainActivity.class);
        PendingIntent reactPandingIntent = PendingIntent.getActivity(getReactApplicationContext(), 0, reactIntent, PendingIntent.FLAG_IMMUTABLE);
        Toast.makeText(reactContext, "타이머 시작!", Toast.LENGTH_SHORT).show();
        //안드로이드 오레오 대응
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT);
            notificationManager.createNotificationChannel(channel);
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(getReactApplicationContext(), CHANNEL_ID)
                .setContentTitle("레시피톡 타이머")
                .setContentText("타이머 종료 예정 시간 : " + endTime)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setUsesChronometer(true)
                .setContentIntent(reactPandingIntent)
                .setOngoing(true);

        int notificationId = 1;
        notificationManager.notify(notificationId, builder.build());

    }

    @ReactMethod
    public void setReserveAlarm(double alarmTime){
        Intent alarmIntent = new Intent(getReactApplicationContext(), AlarmReceiver.class);
        PendingIntent reactPandingIntent = PendingIntent.getBroadcast(getReactApplicationContext(), 0, alarmIntent, PendingIntent.FLAG_IMMUTABLE);
        //예약 알림 설정
        AlarmManager alarmManager = (AlarmManager) getReactApplicationContext().getSystemService(Context.ALARM_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime() + Math.round(alarmTime), reactPandingIntent);
        }else{
            alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime() + Math.round(alarmTime), reactPandingIntent);
        }
    }


    @ReactMethod
    public void deleteTimerNotification() {

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getReactApplicationContext());
        int notificationId = 1;
        notificationManager.cancel(notificationId);
        Toast.makeText(reactContext, "타이머 해제!", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void deleteAlarm() {
        AlarmManager alarmManager = (AlarmManager) getReactApplicationContext().getSystemService(Context.ALARM_SERVICE);
        Intent alarmIntent = new Intent(getReactApplicationContext(), AlarmReceiver.class);
        PendingIntent alarmPendingIntent = PendingIntent.getBroadcast(getReactApplicationContext(), 0, alarmIntent, PendingIntent.FLAG_IMMUTABLE);
        alarmManager.cancel(alarmPendingIntent);
    }


}
