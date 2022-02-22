<script>
    function toggle() {
        window.document.body.classList.toggle('dark-mode')
    }
    </script>
    <button on:click={toggle}>
        <slot/>
    </button>
    <style>
        button {
            color: #333;
            background-color: transparent;
            border: none;
            border-radius: 4px;
            padding: 0.5rem;
            text-transform: uppercase;
            margin: 0;
        }
        :global(body.dark-mode) button {
            background-color: transparent;
            color: #080808;
        }
    </style>