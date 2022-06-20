app.enableQE();
main();

function main() {
    
    // Itt megadhatod az effectet amit módosítani szeretnél, nem kell máshol átírni
    var effect = "Warp Stabilizer";

    if (app.project.activeSequence == null) {
        alert("Please select a sequence first");
        return false;
    }

    var qeSequence = qe.project.getActiveSequence(0);
    var sequence = app.project.activeSequence;
    var videoTracks = sequence.videoTracks;

    var thisQETrack, thisVanillaClip;
    for (var i = 0; i < videoTracks.numTracks; i++) {
        thisQETrack = qeSequence.getVideoTrackAt(i);
        for (var e = 0; e < thisQETrack.numItems; e++) {
            if (thisQETrack.getItemAt(e).type.toString() != "Empty") {
                thisVanillaClip = getVanillaClip(thisQETrack.getItemAt(e), i);
                if (thisVanillaClip != null) {
                    if (thisVanillaClip.isSelected() == true) {
                        
                        for (var j = 0; j < thisVanillaClip.components.numItems; j++) {
                            if(thisVanillaClip.components[j].displayName == effect){
                                
                                // Itt tudod megadni a propertiket és az értéküket megváltoztatni
                                // Többet is megadhatsz egymás alá
                                thisVanillaClip.components[j].properties[3].setValue(1, 1);     // setValue(value, true); value helyére számot, true helyett elég ha csak 1-est írsz a végére, nem kell a true

                                break;  // Ez a break azért kell, hogy csak 1 effecten akarod végrehajtani a beállításokat, és kilép ebből a for ciklusból
                                        // és a többi ugyan olyan effectre már nem teszi rá ezeket a propertiket. 
                                        // Kommenteld ki ha ezt nem szeretnéd!
                            }
                        }
                        
                        break;  // ha 1 track-en ugyan olyan nevű és hosszúságú clip van akkor csak az elsőn futtatja ezt a scriptet utánna 
                                // kilép az egész for ciklusból. Ha ezt nem szeretnéd, akkor kommenteld ki!

                    }
                }
            }
        }
    }

}

function getVanillaClip(qeClip, trackIndex) {
    for (var c = 0; c < app.project.activeSequence.videoTracks[trackIndex].clips.numItems; c++) {
        if (app.project.activeSequence.videoTracks[trackIndex].clips[c].name == qeClip.name && 
            ((app.project.activeSequence.videoTracks[trackIndex].clips[c].end.seconds - app.project.activeSequence.videoTracks[trackIndex].clips[c].start.seconds).toFixed(2) == (qeClip.end.secs - qeClip.start.secs).toFixed(2))) {
            return app.project.activeSequence.videoTracks[trackIndex].clips[c];
        }
    }
}