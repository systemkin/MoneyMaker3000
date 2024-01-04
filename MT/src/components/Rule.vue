<template>

    <div class="state_select" id="state_select">
        <select class="select_alphabet" v-model="props.rule.char">
            <option v-for="char in allowed_chars" :value="char">{{char}}</option>
        </select>
        <select class="select_move" v-model="props.rule.move">
            <option :value="1">➡️</option>
            <option :value="-1">⬅️</option>
            <option :value="0">⬇️</option>
        </select>
        <select class="select_state" v-model="props.rule.stage">
            <option :value="-1">⛔</option>
            <option v-for="index in stages" :key="index" :value="index-1">Q{{index}}</option>
            
        </select>
    </div>
    
</template>


<script setup>

    var props = defineProps(['allowed_chars', 'rule', 'stages'])
    


    function changeRuleChar(event) {
        props.rule.char = event.target.value
    }

    function changeRuleMove(event) {
        props.rule.move = parseInt(event.target.value)
        console.log(props.rule)
    }

    function changeRuleStage(event) {
        props.rule.stage = event.target.value
        console.log(props.rule)
    }
    
</script>

<style>
    select{
        aspect-ratio: 1/1;
        width: 60px;
        font-size: 100%;
        outline: 0;
        border: 0;
        background-color: transparent;
        color: var(--reverse-color);
        
    }

    select option{
        color: black;
    }


</style>