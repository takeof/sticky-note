<script>
    import {createEventDispatcher} from 'svelte';
    import IconButton, { Icon } from '@smui/icon-button';

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

    function editNote() {
        dispatch('edit', { index });
    }

    function deleteNote() {
        dispatch('remove', { index });
    }
</script>

<!-- <div on:mousedown={handleMouseDown} style="left: {left}px; top: {top}px;" class="note"> -->
<div on:mousedown={handleMouseDown} style="left: {left}px; top: {top}px;" class="note">
    <button class="close" on:click={deleteNote}>&times;</button>
    <div class="date">
        <slot name='date'>12/31</slot>
    </div>
    <div class="time">
        <slot name='time'>23:59</slot>
    </div>
    <div on:click={editNote} >
        <slot name="text" />
    </div>
</div>

<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove}/>

<style>
    .note {
      user-select: none;
      cursor: move;
      border: solid 1px gray;
      position: absolute;
      padding: 7px 30px 5px 15px;
      background-color: rgb(219, 253, 175);
      width: 300px;
      height: 45px;
    }
    .date {
      font-size: 0.95em;
      position: absolute;
      top: 60%;
      right: 17%;
      padding: 3px;
      color: darkslategray;
      background-color: rgb(219, 253, 175);
      border: none;
    }
    .time {
      font-size: 0.95em;
      position: absolute;
      top: 60%;
      right: 3%;
      padding: 3px;
      color: darkslategray;
      background-color: rgb(219, 253, 175);
      border: none;
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