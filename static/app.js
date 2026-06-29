(function () {
  function updateToggle(button, collapsed) {
    button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    button.textContent = collapsed ? 'Show' : 'Hide';
  }

  document.querySelectorAll('[data-set-toggle]').forEach((button) => {
    const block = button.closest('.set-block');
    if (!block) return;
    updateToggle(button, block.classList.contains('collapsed'));

    button.addEventListener('click', () => {
      const collapsed = block.classList.toggle('collapsed');
      updateToggle(button, collapsed);
    });
  });

  const anchored = window.location.hash ? window.location.hash.slice(1) : '';
  if (anchored) {
    const el = document.getElementById(anchored);
    if (el) {
      const block = el.closest('.set-block');
      if (block) {
        block.classList.remove('collapsed');
        const button = block.querySelector('[data-set-toggle]');
        if (button) updateToggle(button, false);
      }
      el.classList.add('just-updated');
      setTimeout(() => el.classList.remove('just-updated'), 1200);
    }
  }
})();
