package com.recipetalk.timer;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.recipetalk.MainActivity;
import com.recipetalk.R;

public class AlarmReceiver extends BroadcastReceiver {

    public static final String CHANNEL_ID = "recipeTalk";
    public static final String CHANNEL_NAME = "timer_end";
    public static final AlarmReceiver alarmReceiver = new AlarmReceiver();

    @Override
    public void onReceive(Context context, Intent intent) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        Intent reactIntent = new Intent(context, NotificationActivity.class);
        PendingIntent reactPandingIntent = PendingIntent.getActivity(context, 0, reactIntent, PendingIntent.FLAG_MUTABLE);

        //안드로이드 오레오 대응
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);

        }


        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setDefaults(0)
                .setContentTitle("레시피톡 타이머")
                .setContentText("타이머가 다됬어요!")
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(reactPandingIntent)
                .setOngoing(false)
                .setAutoCancel(true)
                ;

        int notificationId = 1;
        notificationManager.notify(notificationId, builder.build());

    }
}
