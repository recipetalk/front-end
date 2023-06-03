package com.recipetalk.timer;

import android.content.ContentResolver;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactActivity;
import com.recipetalk.R;

public class NotificationActivity extends ReactActivity {
    private Ringtone ringtone;

    @Override
    protected String getMainComponentName() {
        return "recipetalk";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        stopRingtone();
        finish();
    }

    private void stopRingtone() {
        // Ringtone 중지
        if (ringtone != null && ringtone.isPlaying()) {
            ringtone.stop();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        // 앱이 백그라운드로 가거나 액티비티가 종료되면 Ringtone 중지
        ringtone = RingtoneManager.getRingtone(getApplicationContext(), Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.timer));
            ringtone.play();

    }

    @Override
    protected void onPause() {
        super.onPause();

        // 앱이 백그라운드로 가거나 액티비티가 종료되면 Ringtone 중지
        stopRingtone();
    }
}
