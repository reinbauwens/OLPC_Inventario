<?php

namespace RNR\Repository;

/**
 * @author Robin Staes <robin.staes@student.odisee.be>
 */
class ProfilesRepository extends \Knp\Repository {

	/**
	 * [getTableName description]
	 * This function returns the table name
	 * @return [string] The name of the table
	 */
	public function getTableName() {
		return 'profiles';
	}

	public function fetchAll() {
		return $this->db->fetchAll(
				'SELECT profiles.* FROM profiles');
	}
}