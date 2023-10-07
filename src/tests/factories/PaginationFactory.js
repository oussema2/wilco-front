import { Factory } from 'fishery';
import Pagination from '../../entities/Pagination';

export default Factory.define( ( ) => ( new Pagination( {
	page: 0,
	totalPages: -1,
	perPage: 15,
	isFirstPage: true,
	isLastPage: false
} ) ) );
