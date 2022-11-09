package com.project.cobell.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter @Setter
@DynamicInsert
public class PhotoFeed {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "feed_id")
	private Feed feed;

	private String fileName;
}
