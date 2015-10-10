"use strict";
(function(){
  window.Track = class Track {
    constructor(attributes) {
      this.name = attributes.name;
      this.roll = []; //TODO: used when loading a pre-recorded track
    }
    startRecording() {
      this.roll = [];
    }
    stopRecording() {
      this.addNotes([]);
    }
    addNotes(notes) {
      if (this.roll.length === 0) {
        this.startTime = Date.now();
      }
      this.roll.push({
        timeStamp: Date.now() - this.startTime,
        notes: notes
      });
    }
    play() {
      if (this.interval) {
        return
      } else {
        var playbackStartTime = Date.now();
        var currentIndex = 0;
        var self = this;
        this.interval = setInterval(function() {
          var nextSlice = self.roll[currentIndex]
          if (currentIndex < self.roll.length) {
            if (Date.now() - playbackStartTime >= nextSlice.timeStamp) {
              KeyStore.all().forEach(function (note) {
                if (nextSlice.notes.indexOf(note) < 0) {
                  NoteActions.keyReleased(note);
                }
              });
              nextSlice.notes.forEach(function (note) {
                if (!KeyStore.contains(note)) {
                  NoteActions.keyPressed(note);
                }
              });
              currentIndex += 1;
            }
          } else {
            clearInterval(self.interval);
            delete self.interval;
          }
        },16);
      }
    }
  }
})();
