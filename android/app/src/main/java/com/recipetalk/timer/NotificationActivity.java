package com.recipetalk.timer;

import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.recipetalk.R;

public class NotificationActivity extends ReactActivity {
    private Ringtone ringtone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 알림 클릭 이벤트 처리
        stopRingtone(); // 알림 클릭 시 Ringtone 중지
        finish(); // 액티비티 종료
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
        ringtone = RingtoneManager.getRingtone(this, Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.timer));
        if (ringtone != null) {
            ringtone.play();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        // 앱이 백그라운드로 가거나 액티비티가 종료되면 Ringtone 중지
        stopRingtone();
    }
}
