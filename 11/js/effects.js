const EFFECTS = [
  {
    name:'none',
    style:'none',
    min:0,
    max:100,
    step:1,
    unit:'',
  },
  {
    name: 'chrome',
    style:'grayscale',
    min:0,
    max:1,
    step:0.1,
    unit:'',
  },
  {
    name:'sepia',
    style:'sepia',
    min:0,
    max:1,
    step:0.1,
    unit:'',
  },
  {
    name:'marvin',
    style:'invert',
    min:0,
    max:100,
    step:1,
    unit:'%',
  },
  {
    name:'phobos',
    style:'blur',
    min:0,
    max:3,
    step:0.1,
    unit:'px',
  },
  {
    name :'heat',
    style:'brightness',
    min:1,
    max:3,
    step:0.1,
    unit: '',
  }
];
const DEFOULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFOULT_EFFECT;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueField = document.querySelector('.img-upload__effect-level');
const effectValueField = document.querySelector('.effect-level__value');

const isDefoult = () => chosenEffect === DEFOULT_EFFECT;

function hideSlider () {
  if (isDefoult()) {
    sliderValueField .classList.add('hidden');
  } else {
    sliderValueField .classList.remove('hidden');
  }
}

function updateSlider () {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
    connect: 'lower',
  });
}

function onEffectsChange (evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
  hideSlider();
}

noUiSlider.create(sliderElement, {
  range: {
    min: DEFOULT_EFFECT.min,
    max: DEFOULT_EFFECT.max,
  },
  start: DEFOULT_EFFECT.max,
  step: DEFOULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

function changeIntensityEffect () {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDefoult()) {
    imageElement.style.filter = DEFOULT_EFFECT.style;
  }
  imageElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectValueField.value = sliderValue;
}

function resetEffects () {
  chosenEffect = DEFOULT_EFFECT;
  updateSlider();
  hideSlider();
}

sliderElement.noUiSlider.on('update',changeIntensityEffect);
effectsList.addEventListener('click', onEffectsChange);

export {resetEffects};
