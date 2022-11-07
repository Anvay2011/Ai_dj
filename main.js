score_right_wrist=0;
score_left_wrist=0;
left_wrist_y=0;
left_wrist_x=0;
right_wrist_y=0;
right_wrist_x=0;
song1_status="";
song2_status="";
happy="";
thunder="";

function preload(){
    happy=loadSound("happy.mp3");
    thunder=loadSound("thunder.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("pose net is intialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("left Wrist x = "+left_wrist_x+" left Wrist y = "+left_wrist_y);
        console.log("right Wrist x = "+right_wrist_x+" right Wrist y = "+right_wrist_y);
        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("score_left_wrist= "+score_left_wrist);
        score_right_wrist=results[0].pose.keypoints[10].score;
        console.log("score_right_wrist= "+score_right_wrist);
    }
}

function draw(){
    image(video,0,0,600,500);
    song1_status=happy.isPlaying();
    song2_status=thunder.isPlaying();
    if(score_left_wrist>0.2){
    fill("red");
    stroke(255,0,0);
    circle(left_wrist_x,left_wrist_y,20);
    happy.stop();
        if(song2_status==false){
            thunder.play();
            document.getElementById("name_of_song").innerHTML="Playing Thunder"
        }
    }
    if(score_right_wrist>0.2){
        fill("blue");
        stroke(0,0,255);
        circle(right_wrist_x,right_wrist_y,20);
        thunder.stop();
            if(song1_status==false){
                happy.play();
                document.getElementById("name_of_song").innerHTML="Playing Happier"
            }
        }

}

function play(){
thunder.play()
}