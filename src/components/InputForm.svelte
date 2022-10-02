<script>
    import { createEventDispatcher } from 'svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';
    import { DateInput} from 'date-picker-svelte';
  
    const dispatch = createEventDispatcher();
    /** @type {any} */
    export let stickyNote = {};
    export let open = false;
    export let edit = false;
    let text = '';
    let memo = '';
    let date = '';

    function openingHandler() {
      if(edit) {
        text = stickyNote.text;
        memo = stickyNote.memo;
      }
      else {
        text = '';
        memo = '';
        stickyNote.limit = null;
      }

      if(!stickyNote.limit) {
          if(new Date().getHours() > 15) {
            stickyNote.limit = new Date().setDate(new Date().getDate() + 1);
          } else {
            stickyNote.limit = new Date();
          }
          stickyNote.limit.setHours(17);
          stickyNote.limit.setMinutes(0);
      }
      date = datetimeToString(stickyNote.limit);
    }

    function closedHandler() {
      // text = '';
      // memo = '';
    }

    /**
     * @param {string | number | Date} date
     */
    function datetimeToString(date) {
      let val =  new Date(date).getFullYear() + '/'
      val = val + (new Date(date).getMonth() + 1) + '/';
      val = val + new Date(date).getDate() + ' ';
      val = val + new Date(date).getHours() + ':';
      val = val + ('0' + new Date(date).getMinutes()).slice(-2);

      return val;
    }

    function submit() {
        stickyNote = {
            text: text,
            memo: memo,
            limit: Date.parse(date + ':00'),
        }
        dispatch('submit', { stickyNote });
    }
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:SMUIDialog:opening={openingHandler}
  on:SMUIDialog:closed={closedHandler}
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">StickyNote</Title>
  <!-- <Content id="simple-content">Submit sticky note below??</Content> -->
  <div class="input-form">
    <div class="input-item">
        <Textfield bind:value={text} label="Note text">
          <Icon class="material-icons" slot="trailingIcon">edit</Icon>
          <!-- <HelperText slot="helper">Input a note here.</HelperText> -->
        </Textfield>
    </div>
    <div class="input-item">
      <Textfield bind:value={date} label="Limit">
        <Icon class="material-icons" slot="trailingIcon">today</Icon>
      </Textfield>
      <!-- <DateInput bind:value={date} 
        format="yyyy/MM/dd HH:mm"
        placeholder="${new Date()}"
        closeOnSelection /> -->
    </div>
    <div class="input-item">
        <Textfield textarea bind:value={memo} label="Memo" input$rows={4}>
        <HelperText slot="helper">Additional memo if necessary</HelperText>
        </Textfield>
    </div>
  </div>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={submit}>
      <Label>Submit</Label>
    </Button>
  </Actions>
</Dialog>

<style>
    /* :global(body) {
      --date-input-width: 120px;
    } */
    .input-form {
        margin-left: 20px;
    }

    .input-item {
        margin-bottom: 20px;
    }
</style>