const tabs = document.querySelectorAll('.tab-categoria');

tabs.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault(); 

    tabs.forEach(t => t.classList.remove('activa'));

    this.classList.add('activa');
  });
});