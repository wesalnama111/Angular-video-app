import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements  OnInit, OnChanges{
    play = 'play';
    videostart:string='00:00';
    videoduration= '00:00';
    minValue: number =0;
    maxValue: number =30;
    options:  Options= {
        floor: 0,
        ceil: 100,
        step: 1,
        disabled: true,
    }
    subtitles=[];

    videoDuration: number;
    cuttentTime: number=0;

    deletesubtitle (value){
    this.subtitles.splice(value, 1);
    }
    addfullsubtitle(i){
        let track = document.getElementById('video').addTextTrack('subtitles', 'just a test', 'en');
        track.mode = 'showing';
        // add some cues to show the text
        track.addCue(new VTTCue(this.subtitles[i].minValue, this.subtitles[i].maxValue, this.subtitles[i].textValue));
    }
    addsubtitle(){
    let myVideo = document.getElementById('video');
    let duration = Math.floor(myVideo.duration);
        this.subtitles.push({
            minValue: 0,
            maxValue: 200,
            textValue: '',
            options: {
            floor: 0,
            ceil: duration,
            step: 1
    }
});

}
    playpause(){
        let myVideo = document.getElementById('video');
        let minutes = Math.floor(myVideo.duration / 60);
        let seconds = Math.floor(myVideo.duration - minutes * 60);
        this.videoDuration = minutes + ":" + seconds;
        this.videoduration = minutes+":"+seconds;
        this.cuttentTime=1;

        console.log("duration of video",this.videoduration);
        if(this.play === 'play'){
                       myVideo.play();
                       this.play = 'pause';
                       console.log(this.play);
                            return;
        }
       else if(this.play === 'pause'){
            myVideo.pause();
            this.play = 'play';
            console.log(this.play);
            return;
       }
    }
    restart(){
        let myVideo = document.getElementById('video');
        myVideo.currentTime = 0;
    }
    forward(value){
        let myVideo = document.getElementById('video');
        if(myVideo.currentTime >=0){
            myVideo.currentTime += value;
        }
    }

    rewind(value){
        let myVideo = document.getElementById('video');
        if(myVideo.currentTime >= 5) {
            myVideo.currentTime -= value;
        }
        else{
            myVideo.currentTime = 0;
        }
    }
    rangechange(event){
        console.log(event.target.value);
        let myVideo = document.getElementById('video');
        console.log("duration", myVideo.duration);
        console.log("current Time", myVideo.currentTime);
    }
    ngOnInit() {
        if (document.getElementById('video'.duration)) {
                let myVideo = document.getElementById('video');
                this.videoDuration = myVideo.duration;
                console.log("duration", this.videoDuration);
        }
    }
    ngOnChanges() {
        let myVideo = document.getElementById('video');
        this.cuttentTime= myVideo.currentTime;
        console.log("current",this.cuttentTime);
  }
}
