<script>
    import {onMount} from 'svelte';
    import Button, { Label } from '@smui/button';

    import Wall from '../components/Wall.svelte';
    import InputForm from '../components/InputForm.svelte';
  
    /** @type {any[]}*/
    let stickyNotesList = [];
    /** @type {any}*/
    let stickyNote;
    let currentText = '';
    let currentMemo = '';
    let dialogOpen = false;
  
    onMount(async() => {
      await getStickyNotes();
    })
  
    async function getStickyNotes() {
      console.log(`get start: ${Date.now()}`);
      let result = await fetch('/notes', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .catch(error => {sticky_notes: error.message})

      console.log(result);
      stickyNotesList = result.sticky_notes;
      // stickyNotesList = [];
      // stickyNotesList.push({index: 1, text: 'hoge', top: 0})
      console.log(stickyNotesList);
      console.log(`get end: ${Date.now()}`);
    }
  
    async function createStickyNote() {
      console.log(`create start: ${Date.now()}`);
      let response = await fetch('/notes', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'text': stickyNote.text,
          'limit': Date.now() + 24 * 60 * 60 * 1000,
          'memo': stickyNote.memo,
          'color': '',
        })
      })
  
      response.status === 200 && await getStickyNotes();
      currentText = '';
      currentMemo = '';
      console.log(`create end: ${Date.now()}`);
    }
  
    /**
  * @param {{ detail: { index: any; }; }} event
  */
    async function deleteStickyNote(event) {
      console.log(`del start: ${Date.now()}`);
      const index = event.detail.index;
      let response = await fetch(`/notes/${index}`, {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json'
        },
      })
  
      response.status === 200 && await getStickyNotes();
      console.log(`del end: ${Date.now()}`);
    }
  
  </script>
  <Button on:click={() => (dialogOpen = true)}>
    <Label>Sticky Note+</Label>
  </Button>

  <!-- <form on:submit|preventDefault = { createStickyNote}>
    <div>
      Enter your note...
      <input bind:value={ currentText } type="text" id="stickyNote" />
      <input bind:value={ currentMemo } type="text" id="stickyNoteMemo" />
    </div>
    <button type="submit">Sticky Note +</button>
  </form> -->
  
  <Wall bind:stickyNotesList={stickyNotesList} on:remove={deleteStickyNote} />

  <InputForm bind:stickyNote={stickyNote} bind:open={dialogOpen} on:submit={createStickyNote}/>