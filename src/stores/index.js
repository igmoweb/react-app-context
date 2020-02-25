import { default as pageStore } from './page';
import { default as errorsStore } from './errors';
import { default as postsStore } from './posts';
import registerStore from '../context/registerStore';

registerStore( 'page', pageStore );
registerStore( 'errors', errorsStore );
registerStore( 'posts', postsStore );
