<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    /** @type {number} */
    export let index;
    /** @type {number} */
    export let top;
    let left = 20;
    let inMotion = false;

    function handleMouseDown() {
        inMotion = true;
    }

    /**
     * 
     * @param {any} e
     */
    function handleMouseMove(e) {
        if(inMotion) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function handleMouseUp() {
        inMotion = false;
    }

    function deleteNote() {
        dispatch('remove', { index });
    }
</script>

<div on:mousedown={handleMouseDown} style="left: {left}px; top: {top}px;" class="note">
    <button class="close" on:click={deleteNote}>&times;</button>
    <slot name="text"/>
</div>

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove}/>

<style>
    .note {
      user-select: none;
      cursor: move;
      border: solid 1px gray;
      position: absolute;
      padding: 10px 15px;
      background-color: rgb(219, 253, 175);
      width: 250px;
      height: 35px;
    }
  
    .close {
      font-weight: 600;
      cursor: pointer;
      position: absolute;
      top: 3%;
      right: 3%;
      padding: 3px;
      color: black;
      background-color: rgb(219, 253, 175);
      border: none;
    }
  </style>