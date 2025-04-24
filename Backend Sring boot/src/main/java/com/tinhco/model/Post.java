package com.tinhco.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "topic_id")
    private Integer topicId;

    @Column(name = "title", nullable = false, length = 1000)
    private String title;

    @Column(name = "slug", nullable = false, length = 1000)
    private String slug;

    @Column(name = "detail", nullable = false, columnDefinition = "LONGTEXT")
    private String detail;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "type", nullable = false, length = 10)
    private String type;

    @Column(name = "metakey", nullable = false, length = 255)
    private String metakey;

    @Column(name = "metadesc", nullable = false, length = 255)
    private String metadesc;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "created_by", nullable = false)
    private Integer createdBy;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Integer updatedBy;

    @Column(name = "status", nullable = false)
    private Integer status;

    public Post() {
    }

    // Getters and setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMetakey() {
        return metakey;
    }

    public void setMetakey(String metakey) {
        this.metakey = metakey;
    }

    public String getMetadesc() {
        return metadesc;
    }

    public void setMetadesc(String metadesc) {
        this.metadesc = metadesc;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    // Remove getter and setter for creator if not needed
}
