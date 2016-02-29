<?php

namespace RNR\Repository;

/**
 * @author Robin Staes <robin.staes@student.odisee.be>
 */
class PlacesDependenciesRepository extends \Knp\Repository {

	/**
	 * [getTableName description]
	 * This function returns the table name
	 * @return [string] The name of the table
	 */
	public function getTableName() {
		return 'place_dependencies';
	}

	public function fetchAll() {
		return $this->db->fetchAll(
				'SELECT place_dependencies.* FROM place_dependencies');
	}

	public function fetchAllAncestors($ancestor) {
		return $this->db->fetchAll(
				'SELECT place_dependencies.* FROM place_dependencies where descendant_id ='.$ancestor);
	}
}