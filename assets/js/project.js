import * as Tone from 'tone'

function startPage() {
  heading = document.getElementById("Heading1");
  heading.innerHTML = "Procedural Music Generator";
}

function generateSound() {
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
}
