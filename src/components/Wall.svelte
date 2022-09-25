<script>
    import StickyNote from "./StickyNote.svelte";
    /** @type {any[]}*/
    export let stickyNotesList;
</script>

{#each stickyNotesList as stickyNote (stickyNote.index, stickyNote.top)}
    <StickyNote index={stickyNote.index} top={stickyNote.top} on:remove>
        <div slot='text' data-index={stickyNote.index}>{stickyNote.text}</div>
    </StickyNote>
{/each}