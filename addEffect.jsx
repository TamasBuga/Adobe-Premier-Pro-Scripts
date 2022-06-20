app.enableQE();
main();

function main() {

    // Az effect amit használsz! Csak a stringet kell átírni, máshol nem kell
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

                        // Itt adjuk hozzá a kijelölt cliphez az effectet
                        thisQETrack.getItemAt(e).addVideoEffect(qe.project.getVideoEffectByName(effect));

                        break;  // break azért kell, mert csak 1 clipphez adjuk hozzá az effectet
                                // Ha 1 track-en 2 vagy több ugyan olyan nevű és hosszúságú clip van csak arra rakja rá az effectet, ami kivan jelölve, a többire nem
                                // Ha ezt nem szeretnéd, kommenteld ki a break-et!
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