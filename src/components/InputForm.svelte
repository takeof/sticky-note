<script>
    import { createEventDispatcher } from 'svelte';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';
  
    const dispatch = createEventDispatcher();
    /** @type {any} */
    export let stickyNote;
    export let open = false;
    let text = '';
    let memo = '';

    function submit() {
        stickyNote = {
            text: text,
            memo: memo,
        }
        dispatch('submit', { stickyNote });
    }
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">StickyNote</Title>
  <Content id="simple-content">Submit sticky note below??</Content>
  <div class="input-form">
    <div class="input-item">
        <Textfield bind:value={text} label="Note text">
        <Icon class="material-icons" slot="trailingIcon">edit</Icon>
        <HelperText slot="helper">Input a note here.</HelperText>
        </Textfield>
    </div>
    <div class="input-item">
        <Textfield textarea bind:value={memo} label="Memo">
        <!-- <Icon class="material-icons" slot="leadingIcon">Description</Icon> -->
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
    .input-form {
        margin-left: 20px;
    }

    .input-item {
        margin-bottom: 20px;
    }
</style>