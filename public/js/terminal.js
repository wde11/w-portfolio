document.addEventListener('DOMContentLoaded', () => {
            const output = document.getElementById('output');
            const promptEl = document.getElementById('prompt');
            const cursor = document.getElementById('cursor');
            const terminal = document.getElementById('terminal');
            const charDelay = 3;
            const lineDelay = 100;

            // --- State for menu ---
            let selectedMenuIndex = 0;
            let isMenuVisible = false;
            let currentMenuItems = [];

            const bootLines = [
                { text: String.raw`           .___     ____ ____  ` },
                { text: String.raw`__  _  ____| _/____/_   /_   | ` },
                { text: String.raw`\ \/ \/ / __ |/ __ \|   ||   | ` },
                { text: String.raw` \     / /_/ \  ___/|   ||   | ` },
                { text: String.raw`  \/\_/\____ |\___  >___||___| ` },
                { text: String.raw`            \/    \/           ` },
                { text: '' },
                { text: 'Booting WDE11-OS v1.0.0...' },
                { text: `[ OK ] Initializing virtual environment...` },
                { text: `[ OK ] Starting kernel modules...` },
                { text: `[INFO] Mounting virtual file systems...` },
                { text: `[ OK ] Filesystems mounted.` },
                { text: `[INFO] Checking network configuration...` },
                { text: `[ OK ] Network interface eth0 is up.` },
                { text: `[INFO] Starting user session services...` },
                { text: `[ OK ] Services started.` },
                { text: '' },
                { text: 'Welcome to your personal terminal environment.' },
                { text: '' },
            ];

            // --- Menu Definitions ---
            const mainMenuItems = [
                { text: 'Go back to Portfolio', action: () => { window.location.href = './index.html'; } },
                { text: 'Show Github', action: openGithubMenu },
                { text: 'Settings', action: openSettings },
            ];

            function openGithubMenu() {
                const githubMenuItems = [
                    { text: 'Game Development', action: () => { window.open('https://github.com/wde11/spc-rpg-game', '_blank'); } },
                    { text: 'Graduate School System', action: () => { window.open('https://github.com/JohnEstano/Graduate_School_System', '_blank'); } },
                    { text: 'Bootloader Theme', action: () => { window.open('https://github.com/wde11/asus-vivo-theme', '_blank'); } },
                    { text: 'Back', action: displayMainMenu },
                ];
                displayMenu(githubMenuItems);
            }

            function openSettings() {
                const settingsMenuItems = [
                    { text: 'Color: Default', action: () => changeTheme('default') },
                    { text: 'Color: Green', action: () => changeTheme('green') },
                    { text: 'Color: Amber', action: () => changeTheme('amber') },
                    { text: 'Back', action: displayMainMenu },
                ];
                displayMenu(settingsMenuItems);
            }

            function changeTheme(theme) {
                const body = document.body;
                body.className = ''; // Clear existing theme classes
                if (theme !== 'default') {
                    body.classList.add(`theme-${theme}`);
                }
                // Re-display settings menu to show you're still in settings
                openSettings(); 
            }

            // --- Core Functions ---
            let lineIndex = 0;
            function typeLine() {
                if (lineIndex < bootLines.length) {
                    const lineInfo = bootLines[lineIndex];
                    const lineEl = document.createElement('div');
                    const contentEl = (lineIndex < 6) ? document.createElement('pre') : document.createElement('span');
                    lineEl.appendChild(contentEl);
                    output.appendChild(lineEl);

                    let charIndex = 0;
                    function typeChar() {
                        if (charIndex < lineInfo.text.length) {
                            contentEl.innerHTML += lineInfo.text.charAt(charIndex);
                            charIndex++;
                            terminal.scrollTop = terminal.scrollHeight;
                            setTimeout(typeChar, charDelay);
                        } else {
                            lineIndex++;
                            setTimeout(typeLine, lineDelay);
                        }
                    }
                    typeChar();
                } else {
                    finishBoot();
                }
            }
            
            function finishBoot() {
                setTimeout(displayMainMenu, 200); // Give a slight pause before showing menu
            }

            function displayMenu(menuItems) {
                // Clear previous menu if it exists
                const existingMenu = document.getElementById('menu-container');
                if (existingMenu) existingMenu.remove();

                isMenuVisible = true;
                currentMenuItems = menuItems;
                selectedMenuIndex = 0;

                const menuContainer = document.createElement('div');
                menuContainer.id = 'menu-container';
                output.appendChild(menuContainer);

                menuItems.forEach((item, index) => {
                    const menuItemEl = document.createElement('div');
                    menuItemEl.classList.add('menu-item');
                    menuItemEl.dataset.index = index;
                    menuItemEl.textContent = item.text;

                    // Add mouse event listeners for hover and click
                    menuItemEl.addEventListener('mouseover', () => {
                        selectedMenuIndex = index;
                        updateMenuSelection();
                    });

                    menuItemEl.addEventListener('click', () => {
                        const action = currentMenuItems[index]?.action;
                        if (typeof action === 'function') {
                            action();
                        }
                    });

                    menuContainer.appendChild(menuItemEl);
                });
                updateMenuSelection();
                terminal.scrollTop = terminal.scrollHeight;
            }

            function displayMainMenu() {
                displayMenu(mainMenuItems);
            }

            function updateMenuSelection() {
                document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('selected'));
                const selectedEl = document.querySelector(`.menu-item[data-index='${selectedMenuIndex}']`);
                if (selectedEl) {
                    selectedEl.classList.add('selected');
                }
            }

            function handleKeyPress(e) {
                if (!isMenuVisible) return;
                e.preventDefault();

                switch(e.key) {
                    case 'ArrowUp':
                        selectedMenuIndex = (selectedMenuIndex > 0) ? selectedMenuIndex - 1 : currentMenuItems.length - 1;
                        updateMenuSelection();
                        break;
                    case 'ArrowDown':
                        selectedMenuIndex = (selectedMenuIndex < currentMenuItems.length - 1) ? selectedMenuIndex + 1 : 0;
                        updateMenuSelection();
                        break;
                    case 'Enter':
                        const action = currentMenuItems[selectedMenuIndex]?.action;
                        if (typeof action === 'function') {
                            action();
                        }
                        break;
                }
            }

            // --- Event Listeners ---
            document.addEventListener('keydown', handleKeyPress);
            
            // Start the boot animation
            typeLine();
        });