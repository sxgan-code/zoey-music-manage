export default {
    install(app: any) {
        tooltip(app)
    }
}

const tooltip = (app: any) => {
    app.directive('tooltip', {
        mounted(el: HTMLElement, binding: any) {
            const tooltipText = binding.value.text; // 提示文本
            el.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.setAttribute('class', 'tooltip-div')
                tooltip.innerText = tooltipText;
                tooltip.style.position = 'absolute';
                tooltip.style.zIndex = '999';
                tooltip.style.background = 'rgba(255, 255, 255, 0.95)';
                tooltip.style.color = 'black';
                tooltip.style.fontFamily = 'HarmonyOS Scan'
                tooltip.style.fontSize = '10px'
                tooltip.style.fontWeight = 'bold'
                tooltip.style.borderRadius = '4px';
                tooltip.style.padding = '5px';
                tooltip.style.display = 'block';
                // 获取鼠标位置
                tooltip.style.top = `${e.clientY + 20}px`;
                tooltip.style.left = `${e.clientX - 10}px`;
                document.body.appendChild(tooltip);
            });

            el.addEventListener('mouseleave', () => {
                const tooltip = document.getElementsByClassName('tooltip-div')
                for (let i = 0; i < tooltip.length; i++) {
                    tooltip.item(i)?.remove()
                }
            });
            el.addEventListener('click', (e) => {
                const tooltip = document.getElementsByClassName('tooltip-div')
                for (let i = 0; i < tooltip.length; i++) {
                    tooltip.item(i)?.remove()
                }
            })
        }
    })
}