<?php

namespace RNR\Repository;

/**
 * @author Rein Bauwens <rein.bauwens@student.odisee.be>
 */
class StatusesRepository extends \Knp\Repository {

	/**
	 * [getTableName description]
	 * This function returns the table name
	 * @return [string] The name of the table
	 */
	public function getTableName() {
		return 'statuses';
	}

	public function fetchAll() {
		return $this->db->fetchAll(
				'SELECT statuses.id as id, statuses.description as name FROM statuses');
	}



	/**
	 * get the requested Status
	 * @param String $StatusDescription
	 * @return The requested status
	 */
	public function getStatus($StatusDescription) {
		$query = 'SELECT id FROM statuses WHERE description = ' . $this->db->quote($StatusDescription, \PDO::PARAM_INT);
		return $this->db->fetchColumn($query);
	}
}