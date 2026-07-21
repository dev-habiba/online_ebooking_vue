//********* Only Text Uppercase ***********/
export const vUppercase = {
    mounted(el) {
        const handler = () => {
            const start = el.selectionStart;
            const end = el.selectionEnd;

            const value = el.value.toUpperCase();

            if (el.value !== value) {
                el.value = value;

                el.dispatchEvent(
                    new Event("input", { bubbles: true })
                );
            }

            if (document.activeElement === el) {
                el.setSelectionRange(start, end);
            }
        };

        el.addEventListener("input", handler);

        el._uppercaseHandler = handler;
    },

    unmounted(el) {
        el.removeEventListener("input", el._uppercaseHandler);
    }
};



//********* Only Number ***********/
export const vNumberOnly = {
    mounted(el) {
        const handler = () => {
            const start = el.selectionStart ?? 0;

            const value = el.value.replace(/[^0-9]/g, "");

            if (el.value !== value) {
                el.value = value;

                el.dispatchEvent(
                    new Event("input", {
                        bubbles: true
                    })
                );
            }

            if (document.activeElement === el) {
                const position = Math.min(
                    start,
                    el.value.length
                );

                el.setSelectionRange(position, position);
            }
        };

        el.addEventListener("input", handler);

        el._numberOnlyHandler = handler;
    },

    unmounted(el) {
        if (el?._numberOnlyHandler) {
            el.removeEventListener(
                "input",
                el._numberOnlyHandler
            );

            delete el._numberOnlyHandler;
        }
    }
};



//********* Only Number Decimal ***********/
export const vNumberDecimal = {
    mounted(el) {
        const handler = () => {
            if (!el) return;

            const start = el.selectionStart ?? 0;

            let value = el.value.replace(/[^0-9.]/g, "");

            const firstDotIndex = value.indexOf(".");

            if (firstDotIndex !== -1) {
                value =
                    value.substring(0, firstDotIndex + 1) +
                    value
                        .substring(firstDotIndex + 1)
                        .replace(/\./g, "");
            }

            if (el.value !== value) {
                el.value = value;

                el.dispatchEvent(
                    new Event("input", {
                        bubbles: true
                    })
                );
            }

            if (document.activeElement === el) {
                const position = Math.min(
                    start,
                    el.value.length
                );

                el.setSelectionRange(position, position);
            }
        };

        el.addEventListener("input", handler);

        el._numberDecimalHandler = handler;
    },

    unmounted(el) {
        if (el && el._numberDecimalHandler) {
            el.removeEventListener(
                "input",
                el._numberDecimalHandler
            );

            delete el._numberDecimalHandler;
        }
    }
};