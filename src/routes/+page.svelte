<script>
    import {onMount} from 'svelte';
    import Button, { Label } from '@smui/button';

    import Wall from '../components/Wall.svelte';
    import InputForm from '../components/InputForm.svelte';
  
    /** @type {any[]}*/
    let stickyNotesList = [];
    /** @type {any}*/
    let stickyNote;
    let dialogOpen = false;
    let editing = false;
    let targetIndex = -1;
  
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
      // .catch(error => {sticky_notes: error.message + '-' + error.code})
      stickyNotesList = result.sticky_notes;
      console.log(`get end: ${Date.now()}`);
    }
  
    async function createStickyNote() {
      console.log(`create start: ${Date.now()}`);
      var method = 'POST';
      var url = '/notes'
      if (editing) {
        method = 'PUT';
        url = url + `/${targetIndex}`
      }
      let response = await fetch(url, {
        'method': method,
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'data': {
            'text': stickyNote.text,
            'limit': stickyNote.limit,
            'memo': stickyNote.memo,
            'top' : 50,
            'color': '',
          }
        })
      })
  
      response.status === 200 && await getStickyNotes();
      console.log(`create end: ${Date.now()}`);
    }
  
    /**
  * @param {{ detail: { index: any; }; }} event
  */
    async function deleteStickyNote(event) {
      console.log(`del start: ${Date.now()}`);
      targetIndex = event.detail.index;
      let response = await fetch(`/notes/${targetIndex}`, {
        'method': 'DELETE',
        'headers': {
          'Content-Type': 'application/json'
        },
      })
  
      response.status === 200 && await getStickyNotes();
      console.log(`del end: ${Date.now()}`);
    }

    /**
     * @param {{ detail: { index: any; }; }} event
     */
    function editSickyNote(event) {
      targetIndex = event.detail.index;
      stickyNote = stickyNotesList.filter((note) => note.index === targetIndex)[0];
      editing = true;
      dialogOpen = true;
    }
  
  </script>

  <Button on:click={() => {dialogOpen = true; editing = false;}} style="margin-left: 20px;">
    <Label>Sticky Note+</Label>
  </Button>

  
  <Wall bind:stickyNotesList={stickyNotesList} on:remove={deleteStickyNote} on:edit={editSickyNote}/>

  <InputForm bind:stickyNote={stickyNote} bind:open={dialogOpen} bind:edit={editing} on:submit={createStickyNote}/>