package com.health_android;


import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


import java.util.Calendar;

public class Main2Activity extends AppCompatActivity implements View.OnClickListener {

    Button close;
    Button editor;
    TextView user;
    TextView birth;
    TextView blood;
    TextView gender;
    TextView skin;
    TextView chair;
    TextView textViewChoice = null;
    int OK = 0;
    int mYear, mMonth, mDay;
    final int DATE_DIALOG = 1;
    int Choice;
    int funcChoice=-1;
    String []itemchoice;
    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.hide();
        }
        close = (Button) findViewById(R.id.close);
        editor = (Button) findViewById(R.id.editor);
        user = (TextView) findViewById(R.id.user);
        birth = (TextView) findViewById(R.id.birth1);
        blood = (TextView) findViewById(R.id.blood1);
        gender = (TextView) findViewById(R.id.gender1);
        skin = (TextView) findViewById(R.id.skin1);
        chair = (TextView) findViewById(R.id.chair1);
        close.setOnClickListener(this);
        editor.setOnClickListener(this);
        user.setOnClickListener(this);
        birth.setOnClickListener(this);
        blood.setOnClickListener(this);
        gender.setOnClickListener(this);
        skin.setOnClickListener(this);
        chair.setOnClickListener(this);
        final Calendar ca = Calendar.getInstance();
        mYear = ca.get(Calendar.YEAR);
        mMonth = ca.get(Calendar.MONTH);
        mDay = ca.get(Calendar.DAY_OF_MONTH);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.close:
                Intent mIntent = new Intent(Main2Activity.this, MainActivity.class);
                mIntent.putExtra("data","传入JS中的数据...123");
                Main2Activity.this.startActivity(mIntent);
                Main2Activity.this.finish();
                break;
            case R.id.editor:
                if (OK == 0) {
                    editor.setText("保存");
                    OK = 1;
                } else {
                    editor.setText("编辑");
                    OK = 0;
                }

                break;
            case R.id.user:
                if (OK == 1) {
                    inputDialog();
                }
                break;
            case R.id.birth1:
                if (OK == 1) {
                    showDialog(DATE_DIALOG);
                }
                break;
            case R.id.gender1:
                if (OK == 1) {
                    funcChoice=1;
                    showSingleChoiceDialog();
                }
                break;
            case R.id.blood1:
                if (OK == 1) {
                    funcChoice=2;
                    showSingleChoiceDialog();
                }
                break;
            case R.id.skin1:
                if (OK == 1) {
                    funcChoice=3;
                    showSingleChoiceDialog();
                }
                break;
            case R.id.chair1:
                if (OK == 1) {
                    funcChoice=4;
                    showSingleChoiceDialog();
                }
                break;
        }

    }

    protected Dialog onCreateDialog(int id) {
        switch (id) {
            case DATE_DIALOG:
                return new DatePickerDialog(this, mdateListener, mYear, mMonth, mDay);
        }
        return null;
    }

    public void display() {
        birth.setText(new StringBuffer().append(mYear).append("年").append(mMonth + 1).append("月").append(mDay).append("日"));
    }

    private DatePickerDialog.OnDateSetListener mdateListener = new DatePickerDialog.OnDateSetListener() {

        @Override
        public void onDateSet(DatePicker view, int year, int monthOfYear,
                              int dayOfMonth) {
            mYear = year;
            mMonth = monthOfYear;
            mDay = dayOfMonth;
            display();
        }
    };


    private void inputDialog(){
        final EditText editText = new EditText(Main2Activity.this);
        AlertDialog.Builder inputDialog = new AlertDialog.Builder(Main2Activity.this);
        inputDialog.setTitle("用户名").setView(editText);
        inputDialog.setPositiveButton("确定",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if(editText.getText().toString().equals("")){
                            user.setText("未设置");
                        }else{
                            user.setText(editText.getText().toString());
                        }

                    }
                }).show();
    }
    private void showSingleChoiceDialog() {
        final String[] items = {"男","女"};
        final String[] items1 = {"A+","A-","B+","B-","AB+","AB-","O","O-"};
        final String[] items2 = {"类型Ⅰ","类型Ⅱ","类型Ⅲ","类型Ⅳ","类型Ⅴ"};
        final String[] items3 = {"是","否"};
        String string=null;
        switch (funcChoice){
            case 1:
                itemchoice=items;
                textViewChoice=gender;
                string="性别设置";
                break;
            case 2:
                itemchoice=items1;
                textViewChoice=blood;
                string="血型设置";
                break;
            case 3:
                itemchoice=items2;
                textViewChoice=skin;
                string="皮肤类型设置";
                break;
            case 4:
                itemchoice=items3;
                textViewChoice=chair;
                string="轮椅设置";
                break;
        }
        Choice = -1;
        AlertDialog.Builder singleChoiceDialog =
                new AlertDialog.Builder(Main2Activity.this);
        singleChoiceDialog.setTitle(string);

        // 第二个参数是默认选项，此处设置为0
        singleChoiceDialog.setSingleChoiceItems(itemchoice, -1,
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Choice = which;
                    }
                });
        singleChoiceDialog.setPositiveButton("确定",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (Choice != -1) {
                            textViewChoice.setText(itemchoice[Choice]);
                        }
                    }
                });
        singleChoiceDialog.show();
    }


    @Override
    public void onStart() {
        super.onStart();
        SharedPreferences preferences = getSharedPreferences("data",MODE_PRIVATE);
        user.setText(preferences.getString("users","未设置"));
        birth.setText(preferences.getString("births","未设置"));
        gender.setText(preferences.getString("genders","未设置"));
        blood.setText(preferences.getString("bloods","未设置"));
        skin.setText(preferences.getString("skins","未设置"));
        chair.setText(preferences.getString("chairs","未设置"));


    }

    @Override
    public void onStop() {
        super.onStop();
        SharedPreferences.Editor editors = getSharedPreferences("data",MODE_PRIVATE).edit();
        editors.putString("users",user.getText().toString());
        editors.putString("births",birth.getText().toString());
        editors.putString("genders",gender.getText().toString());
        editors.putString("bloods",blood.getText().toString());
        editors.putString("skins",skin.getText().toString());
        editors.putString("chairs",chair.getText().toString());
        editors.apply();

    }
}
