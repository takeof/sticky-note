<script>
    import StickyNote from "./StickyNote.svelte";
    /** @type {any[]}*/
    export let stickyNotesList;

    /**
     * @param {any} date
     */
    function formatDate(date) {
        return (date.getMonth() + 1) + '/' + date.getDate();
    }
    /**
     * @param {any} date
     */
    function formatTime(date) {
        return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
    }
</script>

{#each stickyNotesList as stickyNote (stickyNote.index, stickyNote.top)}
    <StickyNote index={stickyNote.index} top={stickyNote.top} on:remove on:edit>
        <div slot='text' data-index={stickyNote.index}>{stickyNote.text}</div>
        <div slot='date' data-index={stickyNote.index}>{formatDate(new Date(stickyNote.limit))}</div>
        <div slot='time' data-index={stickyNote.index}>{formatTime(new Date(stickyNote.limit))}</div>
    </StickyNote>
{/each}