<template>
    <div class="input_line">
        <div v-for="(char, index) in chars" class="input_box">
            <label :class="{'current_label': current == index}" >{{index}}</label>
            <input class="input_char" autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false" :pattern ="input_pattern" :class="{'current_input': current == index}"
                
                maxlength=1
                @keydown ="event => keyHandler(event, index)"
                @input ="event => inputHandler(event, index)"
                @focus = "event => handleFocus(event, index)"
                @paste = "event => handlePaste(event, index)"
                
                :value = "chars[index]"
                :id = "'input_char_'+index"
                >
        </div>
    </div>

</template>

<script setup>
    import { ref, onMounted, computed, watch, defineProps, defineEmits, nextTick } from 'vue'

    var props = defineProps(['chars', 'current', 'allowed_chars'])
    
    var input_pattern = computed(() => {
        return `[${props.allowed_chars}]{1}`
    })
    const emit = defineEmits(['changePosition'])
    
    

    defineExpose({
        scrollToCurrent
    });


    async function inputHandler(event, index){

        if (event.inputType == "insertText" || event.inputType == "insertCompositionText") {
            event.preventDefault()
            
            let change = insertChar(index, event.target.value[0] || null)
            
            event.target.value = props.chars[index]
            
            
            var nextInput = getInputChar(index+1)

            if (props.chars[index] != null && change)
                nextInput.focus()
            else
                event.target.select()
        }
        
        
    }


    async function scrollToCurrent(focus=true) {
        
        let current_char = document.querySelector("#input_char_"+props.current)
        if (focus)
            current_char.focus()
        
        current_char.scrollIntoView({
            behavior: 'auto',
            block: 'nearest',
            inline: 'center'
        })
    }

    async function handleFocus(event, index){
        let element = event.target
        element.select()

    }


    async function keyHandler(event, index){
        var nextInputChar = getInputChar(index+1)
        var beforeInputChar = getInputChar(index-1)

        switch (event.key){
            case "ArrowLeft":
                event.preventDefault()
                beforeInputChar.focus()
                break;
            case "ArrowRight":
                event.preventDefault()
                nextInputChar.focus()
                break;
            case "ArrowDown":
                emit('changePosition', index)
                event.preventDefault()
                break
                
            case "Delete":
                if (event.target.value.length == 0){
                    nextInputChar.focus()
                    props.chars[index+1] = null
                }else{
                    props.chars[index] = null
                }
                break
                
                
            case "Backspace":
                if (event.target.value.length == 0){
                    beforeInputChar.focus()
                    props.chars[index-1] = null   
                }else{
                    props.chars[index] = null
                }
                break
            
        }
    }

    async function handlePaste(event, _index){
        event.preventDefault()
        let paste = (event.clipboardData || window.clipboardData).getData("text");
        
        for (let index = 0; index < paste.length; index++) {
            insertChar(_index+index, paste[index])
        }
        
    }

    function insertChar(index, char) {
        if (props.allowed_chars.includes(char) || char == null){
            props.chars[(index + props.chars.length) % props.chars.length] = char
            return true
        }

        return false
    }
    
    function getInputChar(index) {
        return document.getElementById("input_char_"+ ((index + props.chars.length) % props.chars.length))
    }
    

    
</script>


<style>
    .input_box{
        display: flex;
        flex-direction: column;
        
        text-align: center;
        
    }

    .input_box > input{
        
        aspect-ratio: 1/1;
        width: 50px;
        height: 50px;
        border: 1px solid black;
        border-radius: 5px;
        
        text-align: center;
        

        &:focus{
            outline: 0;
            border: 5px solid var(--color-background);
            
        }

        &::selection{
            background: none;
        }
    }

    .input_line{
        /* height: 80px; */
        width: 100%;
        overflow-x: scroll;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 2px;
        padding-bottom: 5px;
        margin-bottom: 3%;
        padding-top: 5px;
        
    }

    .input_char{
        font-size: 28px;
    }

    .current_input{
        background-color: orange;
        z-index: 2;

        &:focus{
            border-color: var(--color-background) !important;
            background-color: orange;
        }
    }

    .current_label{
        background-color: transparent;
        font-weight: bold;
        color: orange;
    }
    
</style>
