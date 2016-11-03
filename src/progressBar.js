import {findChildByRole} from './dom';



/**
 *
 */
const defaultMakeLabel = ({value}) => `${value}%`;



/**
 *	Returns a function that tests aa progress bar component.
 *
 *	@param function factory A factory function that takes
 *		a map of options and returns a DOM node containing a
 *		progress bar.
 */
export default function createProgressBarTest(factory, makeLabel = defaultMakeLabel) {
	return function testProgressBar() {
		describe('Critère 1 : L\'implémentation ARIA est-elle conforme ?', function() {
			it(
				'Test 1.1 : Le composant respecte-t-il ces conditions ?'
				+ '\n\t- Le composant possède un role="progressbar"'
				+ '\n\t- Le composant possède une propriété aria-valuemin="[valeur minimale]"'
				+ '\n\t- Le composant possède une propriété aria-valuemax="[valeur maximale]"',
				function() {
					const props = {
						min: 10,
						max: 90,
						value: 50
					};

					const node = factory(props);
					const progressBar = findChildByRole(node, 'progressbar');

					expect(progressBar.getAttribute('aria-valuemin')).to.equal('10');
					expect(progressBar.getAttribute('aria-valuemax')).to.equal('90');
				}
			);

			it(
				'Test 1.2 : Le composant respecte-t-il une de ces conditions ?'
				+ '\n\t- Le composant est constitué d\'un élément graphique qui possède une alternative pertinente'
				+ '\n\t- Le composant possède une propriété aria-labelledby="[id]" référençant un passage de texte faisant office de nom'
				+ '\n\t- Le composant possède un attribut title faisant office de nom',
				function() {
					const props = {
						min: 10,
						max: 90,
						value: 50
					};

					const node = factory(props);
					const progressBar = findChildByRole(node, 'progressbar');

					expect(progressBar).to.satisfy((p) =>
						(p.getAttribute('title') || p.getAttribute('aria-labelledby'))
					);
				}
			);

			it(
				'Test 1.3 : Chaque progression, dont la valeur courante est connue respecte-t-elle ces conditions ?'
				+ '\n\t- Le composant possède une propriété aria-valuenow="[valeur courante]"'
				+ '\n\t- Le composant possède, si nécessaire, une propriété aria-valuetext="[valeur courante + texte]"'
				+ '\n\t- La valeur de la propriété aria-valuenow est mise à jour selon la progression',
				+ '\n\t- La valeur de la propriété aria-valuetext est mise à jour selon la progression',
				function() {
					const props = {
						min: 10,
						max: 90,
						value: 50
					};

					const node = factory(props);
					const progressBar = findChildByRole(node, 'progressbar');

					expect(progressBar.getAttribute('aria-valuenow')).to.equal('50');
					expect(progressBar.getAttribute('aria-valuetext')).to.equal(makeLabel(props));
				}
			);

			it(
				'Test 1.4 : Chaque progression, dont la valeur courante est inconnue respecte-t-elle ces conditions ?'
				+ '\n\t- Le composant ne possède pas de propriété aria-valuenow'
				+ '\n\t- Le composant ne possède pas de propriété aria-valuetext',
				function() {
					const props = {
						min: 10,
						max: 90,
						value: undefined
					};

					const node = factory(props);
					const progressBar = findChildByRole(node, 'progressbar');

					expect(progressBar.getAttribute('aria-valuenow')).to.be.oneOf([null, '']);
					expect(progressBar.getAttribute('aria-valuetext')).to.be.oneOf([null, '']);
				}
			);
		});
	};
}